/*
 Copyright (c) 2012-2019, Pierre-Olivier Latour
 All rights reserved.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of Pierre-Olivier Latour may not be used to endorse
 or promote products derived from this software without specific
 prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL PIERRE-OLIVIER LATOUR BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var ENTER_KEYCODE = 13;

var _path = null;
var _pendingReloads = [];
var _reloadingDisabled = 0;
var _style = -1;

function formatFileSize(bytes) {
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' KB';
}

function _showError(message, textStatus, errorThrown) {
    $("#alerts").prepend(tmpl("template-alert", {
        level: "danger",
        title: (errorThrown != "" ? errorThrown : textStatus) + ": ",
        description: message
    }));
}

function _disableReloads() {
    _reloadingDisabled += 1;
}

function _enableReloads() {
    _reloadingDisabled -= 1;

    if (_pendingReloads.length > 0) {
        _reload(_pendingReloads.shift());
    }
}

function _reload(path) {
    if (_reloadingDisabled) {
        if ($.inArray(path, _pendingReloads) < 0) {
            _pendingReloads.push(path);
        }
        return;
    }

    _disableReloads();
    $.ajax({
        url: 'list',
        type: 'GET',
        data: { path: path, style: _style },
        dataType: 'json'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        _showError("Failed retrieving contents of \"" + path + "\"", textStatus, errorThrown);
    }).done(function (data, textStatus, jqXHR) {
        var scrollPosition = $(document).scrollTop();

        if (path != _path) {
            $("#path").empty();
            if (path == "/") {
                $("#path").append('<li class="active">' + _device + '</li>');
            } else {
                $("#path").append('<li data-path="/"><a>' + _device + '</a></li>');
                var components = path.split("/").slice(1, -1);
                for (var i = 0; i < components.length - 1; ++i) {
                    var subpath = "/" + components.slice(0, i + 1).join("/") + "/";
                    $("#path").append('<li data-path="' + subpath + '"><a>' + components[i] + '</a></li>');
                }
                $("#path > li").click(function (event) {
                    _reload($(this).data("path"));
                    event.preventDefault();
                });
                $("#path").append('<li class="active">' + components[components.length - 1] + '</li>');
            }
            _path = path;
        }

        $("#listing").empty();
        if (_style == 0) {
            for (var i = 0, file; file = data[i]; ++i) {
                $(tmpl("template-listing", file)).data(file).appendTo("#listing");
            }
        } else {
            for (var i = 0, file; file = data[i]; ++i) {
                $(tmpl("template-app", file)).data(file).appendTo("#listing");
            }
        }
        

        $(".button-download").click(function (event) {
            var path = $(this).parent().parent().data("path");
            setTimeout(function () {
                window.location = "download?path=" + encodeURIComponent(path);
            }, 0);
        });

        $(".button-open").click(function (event) {
            var path = $(this).parent().parent().data("path");
            _reload(path);
        });

        $(".open").click(function (event) {
            var path = $(this).data("path");
            _reload(path);
        });

        $(".button-file").click(function (event) {

            if (_style == 0) {
                var size = $(this).data("size");
                var path = $(this).data("path");
                var isIPA = $(this).data("isIPA");
                if (path[path.length - 1] == "/") {
                    path = path.slice(0, path.length - 1);
                }
                var name = path;
                if (name[0] == "/") {
                    name = name.slice(1, name.length - 1);
                }
    
                if (isIPA) {
                    $("#btn-install").css("display", "inline")
                }
                $(".modal-file-name").data("path", path);
                $(".modal-file-name").html(name);
                $(".modal-file-size").html(formatFileSize(size));
                $("#file-modal").modal("show");
            } else {
                var slf = $(this);
                $("#app-modal").data("path",slf.data("path"));
                $("#app-modal").data("bundleId",slf.data("bundleId"));
                $("#app_logo").attr('src',slf.data("logo"));
                $("#app_name").text(slf.data("name"));
                $("#app_version").text(slf.data("version"));
                $("#app_bundleId").text(slf.data("bundleId"));
                $("#app_cert").text(slf.data("cert"));
                $("#app_time").text(slf.data("time"));
                $("#app_size").text(formatFileSize(slf.data("size")));
                $("#app_file").text(slf.data("path"));


                $("#app-modal").modal("show");
            }
           
        });

        $(document).scrollTop(scrollPosition);
    }).always(function () {
        _enableReloads();
    });
}

function showFileList() {
    $("#upload_tip").css("display", "inline");
    $("#upload-file").css("display", "inline");
    $("#style_file").addClass("active");
    $("#style_file").addClass("btn-primary");
    $("#style_file").removeClass("btn-default");


    $("#style_app").addClass("btn-default");
    $("#style_app").removeClass("active");
    $("#style_app").removeClass("btn-primary");

    
    $("#upload-file").click(function (event) {
        $("#fileupload").click();
    });

    // Prevent event bubbling when using workaround above
    $("#fileupload").click(function (event) {
        event.stopPropagation();
    });

    $("#fileupload").fileupload({
        dropZone: $(document),
        pasteZone: null,
        autoUpload: true,
        sequentialUploads: true,
        // limitConcurrentUploads: 2,
        // forceIframeTransport: true,

        url: 'upload',
        type: 'POST',
        dataType: 'json',

        start: function (e) {
            $(".uploading").show();
        },

        stop: function (e) {
            $(".uploading").hide();
        },

        add: function (e, data) {
            var file = data.files[0];
            var relativePath = file.relativePath;
            if (typeof(relativePath) == "undefined") {
                relativePath = "";
            }
            data.formData = {
                path: _path,
                relativePath: relativePath
            };
            data.context = $(tmpl("template-uploads", {
                path: _path + file.name
            })).appendTo("#uploads");
            var jqXHR = data.submit();
            data.context.find("button").click(function (event) {
                jqXHR.abort();
            });
        },

        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            data.context.find(".progress-bar").css("width", progress + "%");
        },

        done: function (e, data) {
            _reload(_path);
        },

        fail: function (e, data) {
            var file = data.files[0];
            if (data.errorThrown != "abort") {
                _showError("Failed uploading \"" + file.name + "\" to \"" + _path + "\"", data.textStatus, data.errorThrown);
            }
        },

        always: function (e, data) {
            data.context.remove();
        },

    });
}

function showAppList() {
    
    $("#upload_tip").css("display", "none");
    $("#upload-file").css("display", "none");

    $("#style_app").addClass("active");
    $("#style_app").addClass("btn-primary");
    $("#style_app").removeClass("btn-default");


    $("#style_file").addClass("btn-default");
    $("#style_file").removeClass("active");
    $("#style_file").removeClass("btn-primary");
}

function changeStyle(style) {
    if (style == -1) {
        style = 0;
    }
    if (_style == style) {
        return;
    }
    _style = style;
    if (_style == 0) {
        showFileList();
        _reload(_path);
    } else {
        showAppList();
        _reload("/");
    }
    
}

$(document).ready(function () {

    changeStyle(_style);
    // Workaround Firefox and IE not showing file selection dialog when clicking on "upload-file" <button>
    // Making it a <div> instead also works but then it the button doesn't work anymore with tab selection or accessibility
    $("#download-confirm").click(function (event) {
        $("#file-modal").modal("hide");
        var path = $(".modal-file-name").data("path");
        setTimeout(function () {
            window.location = "download?path=" + encodeURIComponent(path);
        }, 0);
    });

    $("#btn-install").click(function (event) {
        $("#file-modal").modal("hide");
        var path = $(".modal-file-name").data("path");
        var param = {};
        param.path = path;
        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            contentType: "application/json",
            url: 'install',
            cache: false,
            processData: false,
            success: function (result, textStatus, jqXHR) {
                window.location = result.url;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                _showError("Failed install \"" + path, textStatus, errorThrown);
                return false;
            }
        });

    });

    $("#app-confirm").click(function (event) {
        $("#app-modal").modal("hide");
        var path = $("#app-modal").data("path");
        setTimeout(function () {
            window.location = "download?path=" + encodeURIComponent(path);
        }, 0);
    });

    $("#app-install").click(function (event) {
        $("#app-modal").modal("hide");
        var path = $("#app-modal").data("path");
        var param = {};
        param.path = path;
        param.bundleId = $("#app-modal").data("bundleId");
        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            contentType: "application/json",
            url: 'install',
            cache: false,
            processData: false,
            success: function (result, textStatus, jqXHR) {
                window.location = result.url;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                _showError("Failed install \"" + path, textStatus, errorThrown);
                return false;
            }
        });

    });


    $("#reload").click(function (event) {
        _reload(_path);
    });

    _reload("/");

});
