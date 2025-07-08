# eSign for TrollStore: Great Unofficial App Store for TrollStore

eSign+ (or eSignPlus) is a modified version of eSign that allows and supports the installation of IPA files on TrollStore instead of using certificates. This is an TrollApps alternative for users which prefer the eSign interface more or want to switch for any particular reason. This is not an official or approved app store of TrollStore (opa334 has disapproved of official app stores for TrollStore due to piracy concerns). 

Before starting the entirety of this block of text, keep in mind that the eSign+ persistence app can be called the eSign+ helper app. These are not exact since these have slightly different purposes but the outcome is the same, really.

## Everything about eSign+

### Is this your work?

No. Here's the truth and history of eSign+: This was uploaded by an more obscure source and it generally was hard-to-find. A few Reddit threads were about this tool which barely anybody had found and only one YouTube video of it by TechJunkie Aman. TechJunkie Aman had been using the same source as everybody else, the same broken and non-working source as of today. One day, while following that tutorial... the source didn't work and I couldn't get the files! **I LOOKED EVERYWHERE FOR THE FILES... EVERY ARCHIVE... EVERY CLUE... EVERY FOOTPRINT... I found it on some random web server archive which served the files (the web server is defunct as of today)**. That's how I got the tarred version of eSign+ which works as of today (assuming the TechJunkie Aman or other official tutorials that may have been released have worked) and was able to untar it, modify it and generally spread and use it.

However, it's not just a case of "total theft". The program itself has been barely rewritten from original eSign (UI elements, license etc. etc.) except the functionality. In the other hand, without my intensive search, eSign+ would remain unfound. Without my dedication to the repository, extras and other things coming out (eSign++ is coming!), this would remain a myth on the shadow. 

### Does this have bugs?

This is the truly unmodified version (tarred and untarred) eSign+. This doesn't include the possible bugs of eSign++ or any modified eSign+ (which in turn isn't eSign+) version. The bugs are:

1. Helper Application Bug (Tested): The original helper app works as expected when setting it up however when making a new helper app (particularly after removing the helper app) with any system binary/app. The new helper binary/app **doesn't work** and upon opening, it automatically closes. It may happen or may not happen for you.
2. Small TrollBug (lolololol): This is a small bug. Firstly, the application will not show up in TrollStore which makes uninstallation slightly harder. When uninstalling the app, you need to go to eSign+, Settings and click the red Uninstall button and choose the best option for your needs. After that, refresh the icon cache on TrollStore, **not your jailbreak**. If the app doesn't go away after that, refer to the "**How to Uninstall eSign+?**" section.

Those are all the currently found bugs. For unfound/new bugs, please report it as a GitHub issue (keep in mind: I'm not a expert on iOS coding, somebody either needs to pull request or this bug needs to be very well documented: possibly going down deep to the precise file causing the issue). If your issue was reported but hasn't got fixed, if it's a big issue, bump it (respond to it with not "bump" but a simple message about it to bring it on top of the issues) or if it's a small issue, wait for it to eventually get attention.

### How to Uninstall eSign+?

99.999% of the time, eSign+ will be gone after simply uninstalling it via the app and refreshing the TrollStore icon cache. If it's not uninstalled or you simply want to get all traces of eSign+ off your device, it's quite easy to do both in these moves:

1. Uninstall the application in the eSign+ settings
2. If you have Filza (assuming you have not installed eSign+ from other sources, installed it from TechJunkie Aman's tutorial or simply from Filza), open it and check the path of where you installed the app at, the helper app at (rewind possible followed tutorials or steps). When found, remove the entire app (not including helper binary)
3. (Optional) Go to the helper app and uninstall it
4. (Optional but recommended) Perform system cleaning in iClean (or iClean Pro) to clean off the app 
5. Go to the Files app (or Filza), find the eSign+ folder/ZIP and uninstall it. This ensures that the pre-install traces of the app get removed.
6. Refresh the TrollStore icon cache
7. (Optional but recommended) Remove all the .plist files and traces of the eSign+ app 
8. If this issue still isn't fixed, do all the optional steps if undone. Lastly, refresh your jailbreak's icon cache. If the app is still there, restart your phone.

### Does this tool require jailbreak?

That depends on the way you are setting eSign+ up! The traditional way to setup eSign+ (refer to "**Setting up eSign+**") requires a rootful jailbreak. The other ways of setting this program up don't require any jailbreaking or are easier to do. If you don't have jailbreak privileges, use the other methods of setting eSign+ up.

The traditional method of setting eSign+ up requires a jailbreak of the rootful environment since apart from the convenience reasons (installing apps that are typically only installed and found in their true power at jailbroken environments), the modification of system files and directories, change of group and user ownership and permission changes all require jailbreaking and a rootful one, that is!

### What version of eSign is this tool?

It's the eSign 5.0.0 version under the hood. That's not the newest version but it's not old at all!

### Can this tool do regular signing?

This tool can perform regular signing however it's main purposes is "Troll Install" (installing via TrollStore). If you want to exclusively use eSign+ or further projects of eSign+ for signing with certificates, please use eSign since as of today, it's a better maintained and updated project and it's planned that eSign+'s other projects will totally remove such signing functionality.

### Setting up eSign+

The helper app means the app which installs and manages the other app (eSign+ in this case) which makes it easy to manage and install the other app (eSign+). It is a very different app compared to any system app or anything else.
A system app is an app provided by iOS by default. Apps can also be called binaries. These apps are lightweight and include Books, Notes, Calculator, Camera, Photos etc. These apps are built into the system by default.
An useless system app is an app which you don't use or care about at all in iOS. This app will be replaced with the helper app when following the traditional method.

This includes the entire tutorial from start-to-finish on how to install and set up eSign+. It has several methods of doing so, it's sorted from the oldest to newest. **This list is not sorted through reliability metrics, it's sorted through oldest to newest. Changes to this sorting may happen if such methods don't work at all.**

None of these ways require any external device such as a computer or any SSH session unless in cases where you cannot install the files into your iOS device! You should follow all steps into your iOS device. Keep in mind that all of these ways are constantly getting monitored and updated for bug fixes and simpler setup. **These tutorials don't assume any prior experience, explain steps well and call directories "folders"**.

1. Traditional Method

This method is known as the "traditional" method because for a long time, it has been the only way to set eSign+ up. This way is reliable however it's only drawback is the fact that it requires a rootful jailbreak and Filza (for setting up eSign+ helper app into a system binary to install eSign+). If you don't meet such requirements, skip over this method and move on to the next ones. This way doesn't need the installation of an IPA as the helper app sets eSign+ up! 

1. Go to [https://github.com/eSignPlus/eSignPlus](eSignPlus's GitHub repository), click the **Code** button and lastly, click the **Download ZIP** button. This downloads the entire repository as an compressed ZIP file.
2. When downloaded, open **Files** and navigate to the file (if not already there). Once you see the file, **click** the ZIP file (or hold it and select **Uncompress** from the file's menu). This will make a folder of eSign+'s helper app which is essential.
3. Once the folder is created, **open it and share the eSignPlus folder (which is inside the folder you opened) to Filza**.
4. In Filza, you will see a folder named **eSignPlus** or **eSignPlus (1)** (with the number being the amount of duplicate times the folder was created). **Open the folder** and open the folder inside of it named **eSignPlusSetup5.0.0** (5.0.0 is the name of the eSign version being used, not the eSign+ version). You will see two files: **esignhelper** and **App**.
5. The **App** file represents the name of the system app which you are willing to replace with the helper app. Rename the **App** file to the system app you will replace it with. This system app should be one you don't use (that's useless for you) since it will be permamently replaced with the helper app unless you reinstall the system app which will remove the helper app. You can find a [https://en.wikipedia.org/wiki/List_of_built-in_iOS_apps#Applications](**list of built-in system apps**). A good name to give it is **Books** since the **Books** app is useless for most people. In other words: rename the **App** file to the name of a useless built-in iOS app like Books.
6. After doing that, **hold** the file and select **Copy** from the file's menu. This should temporarily appear in a blue box: "1 item(s) in Pasteboard. Tap here to Paste"
Text-only Tutorial
