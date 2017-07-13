=== Google 2-Step Verification by BestWebSoft ===
Contributors: bestwebsoft
Donate link: https://bestwebsoft.com/donate/
Tags: google, google authenticator, 2-step authentication, 2-factor verification, google verification, 2FA, google autentificator, two factor authentication, secure wordpress authentication, wordpress verification code, wordpress  authentication code, protect login form
Requires at least: 3.9
Tested up to: 4.8
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Stronger security solution which protects your WordPress website from hacks and unauthorized login attempts.

== Description ==

Google 2-Step Verification plugin is the best security solution that protects your WordPress website from phishing and passwords steal. Each user can configure their profile settings and add additional verification step to the login form.

Protect your WordPress website with 2-Step Verification now!

= Free Features =

* Add Google 2-Step Verification to the default WordPress Login form
* Enable verification methods:
	* Authenticator app code
	* Email code
	* Backup codes
* Select the user roles that can use Google 2-Step Verification
	* All user roles
	* Administrator
* Enable 2-step verification option for user account on the personal profile page
* Set the expiration time for:
	* Email code
	* Authenticator code
* Enable email notifications about failed verification attempt
* Add custom code via plugin settings page
* Compatible with latest WordPress version
* Incredibly simple settings for fast setup without modifying code
* Detailed step-by-step documentation and videos
* RTL ready

> **Pro Features**
>
> All features from Free version included plus:
>
> * Add Google 2-Step Verification to:
> 	* WooCommerce Login form
> 	* BuddyPress Login form
> * Select specific user roles Google 2-Step Verification will be available for
> * Customize email notifications subject and message
> * Сonfigure all subsites on the network
> * Get answer to your support question within one business day ([Support Policy](https://bestwebsoft.com/support-policy/))
>
> [Upgrade to Pro Now](https://bestwebsoft.com/products/wordpress/plugins/google-2-step-verification/?k=9022c2480b9d7bea65e012e3984b982b)

If you have a feature suggestion or idea you'd like to see in the plugin, we'd love to hear about it! [Suggest a Feature](https://support.bestwebsoft.com/hc/en-us/requests/new)

= Documentation =

* [[Doc] Installation](https://docs.google.com/document/d/1-hvn6WRvWnOqj5v5pLUk7Awyu87lq5B_dO-Tv-MC9JQ/)

= Help & Support =

Visit our Help Center if you have any questions, our friendly Support Team is happy to help - <https://support.bestwebsoft.com/>

= Translation =

* Russian (ru_RU)
* Ukrainian (uk)

Some of these translations are not complete. We are constantly adding new features which should be translated. If you would like to create your own language pack or update the existing one, you can send [the text of PO and MO files](https://codex.wordpress.org/Translating_WordPress) to [BestWebSoft](https://support.bestwebsoft.com/hc/en-us/requests/new) and we'll add it to the plugin. You can download the latest version of the program for work with PO and MO [files Poedit](https://www.poedit.net/download.php).

= Recommended Plugins =

* [Updater](https://bestwebsoft.com/products/wordpress/plugins/updater/?k=6d4729ea9c8163561b5675be00264496) - Automatically check and update WordPress website core with all installed plugins and themes to the latest versions.
* [SMTP](https://bestwebsoft.com/products/wordpress/plugins/smtp/) - Configure SMTP server to receive email messages from WordPress to Gmail, Yahoo, Hotmail and other services.

== Installation ==

1. Upload the `bws-google-2-step-verification` folder to `/wp-content/plugins/` directory.
2. Activate the plugin using the 'Plugins' menu in your WordPress admin panel.
3. You can adjust the necessary settings using your WordPress admin panel in "Dashboard" > "Google 2-Step".

== Frequently Asked Questions ==

= I am trying to setup the Authenticator app, but always get "Wrong code, try again" message? =

Please make sure that the time on your web-server corresponds to the world UTC time. GMT offset doesn't matter.
You can also set larger value for the "Authenticator Time Window" option on the plugin settings page to allow some time drifting.

= I have enabled the "Email" verification method and/or "Failed Attempt Notifications" option on the profile page, but no emails are coming? =

Please follow the instructions below:

1. Email messages can be marked as spam on the server.
2. Perhaps email sending is not set. You should install an extra plugin called [SMTP by BestWebSoft](https://bestwebsoft.com/products/wordpress/plugins/smtp/) and configure it. Afterwards you should open the "Send A Test Email" tab on the plugin settings page, check an option "Display log", send a test email and you will see if the plugin logs have errors.

= Google 2-Step Verification not displayed on my Login form. Why? =

Probably, your theme uses custom Login form. Follow the next steps in order to add Google 2-Step Verification to a custom Login form on your Wordpress website:
1. Install the Google 2-Step Verification plugin and activate it.
2. Open the file (PHP or HTML) with the form (where you would like to add Google 2-Step Verification to).
3. Insert the following line to display the Google 2-Step Verification.

For PHP:

`do_action( 'gglstpvrfctn_custom_login_form' );`

For HTML:

`<?php do_action( 'gglstpvrfctn_custom_login_form' ); ?>`

= I have some problems with the plugin's work. What Information should I provide to receive proper support? =

Please make sure that the problem hasn't been discussed yet on our forum (<https://support.bestwebsoft.com>). If no, please provide the following data along with your problem's description:

1. the link to the page where the problem occurs
2. the name of the plugin and its version. If you are using a pro version - your order number.
3. the version of your WordPress installation
4. copy and paste into the message your system status report. Please read more here: [Instruction on System Status](https://docs.google.com/document/d/1Wi2X8RdRGXk9kMszQy1xItJrpN0ncXgioH935MaBKtc/edit)

== Screenshots ==

1. Google 2-Step Verification on the Login page.
2. Google 2-Step Verification on the profile page.
3. Google 2-Step Verification settings page.

== Changelog ==

= V1.0.0 - 30.06.2017 =
* NEW : Plugin has been released.

== Upgrade Notice ==

= V1.0.0 =
* Plugin release