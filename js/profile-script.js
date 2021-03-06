( function( $ ) {
	$( document ).ready( function() {
		/* Page profile.php */

		$( '#gglstpvrfctn-backup-codes-wrapper, #gglstpvrfctn-secret-manual' ).hide();

		if ( 0 < $( '.gglstpvrfctn-codes-count' ).data( 'gglstpvrfctn-codes-count' ) ) {
			$( '#gglstpvrfctn-toggle-codes' ).show();
		}


		function generateQr() {
			var secret = $( '#gglstpvrfctn-qr-link' ).data( 'gglstpvrfctn-secret' ),
				authenticatorLink = 'otpauth://totp/' + gglstpvrfctnScriptVars.hostname + '%20%28' + gglstpvrfctnScriptVars.username + '%29?secret=' + secret;
			var qrOptions = {
				render: 'canvas', /* render method: 'canvas', 'image' or 'div' */
				/* version range somewhere in 1 .. 40 */
				minVersion: 1,
				maxVersion: 40,
				ecLevel: 'L', /* error correction level: 'L', 'M', 'Q' or 'H' */
				/* offset in pixel if drawn onto existing canvas */
				left: 0,
				top: 0,
				size: 200, /* size in pixel */
				fill: '#000', /* code color or image element */
				background: '#fff', /* background color or image element, null for transparent background */
				text: authenticatorLink, /* content */
				radius: 0, /* corner radius relative to module width: 0.0 .. 0.5 */
				quiet: 0, /* quiet zone in modules */
				/* modes */
				/* 0: normal */
				/* 1: label strip */
				/* 2: label box */
				/* 3: image strip */
				/* 4: image box */
				mode: 0,
				mSize: 0.1,
				mPosX: 0.5,
				mPosY: 0.5,
				label: 'no label',
				fontname: 'sans',
				fontcolor: '#000',
				image: null
			}
			$( '#gglstpvrfctn-qr-link' ).html('').qrcode( qrOptions ).show();
		}

		/* Hide/Show settings tab for enabled/disabled authentication methods */
		$( '#gglstpvrfctn-enabled' ).on( 'change', function() {
			if ( $( this ).is( ':checked' ) ) {
				$( '#gglstpvrfctn-settings-wrapper' ).slideDown();
			} else {
				$( '#gglstpvrfctn-settings-wrapper' ).slideUp();
			}
		} ).trigger( 'change' );

		/* Hide/Show settings tab for enabled/disabled authentication methods */
		$( '.gglstpvrfctn-methods' ).on( 'change', function() {
			var method = $( this ).data( 'method' );
			if ( $( this ).is( ':checked' ) ) {
				$( '#gglstpvrfctn_wrapper_' + method ).slideDown();
			} else {
				$( '#gglstpvrfctn_wrapper_' + method ).slideUp();
			}
		} ).trigger( 'change' );

		/* On 'Get new secret' button click get new secret, show popup and generate QR code in it */
		$( '#gglstpvrfctn-get-new-secret' ).on( 'click', function( e ) {
			e.preventDefault();
			$.ajax( {
				type	: 'POST',
				url		: ajaxurl,
				data	: {
					action:				'gglstpvrfctn_get_new_secret',
					gglstpvrfctn_nonce:	gglstpvrfctnScriptVars.ajax_nonce
				},
				success: function( data ) {
					$( '#gglstpvrfctn-get-new-secret' ).hide();
					$( '#gglstpvrfctn-cancel-new-secret' ).show();
					$( '#gglstpvrfctn-check-code' ).val( data )
					$( '#gglstpvrfctn-qr-link' ).data( 'gglstpvrfctn-secret', data )
					generateQr();
					var code = data.match(/.{1,4}/g);
					code = code.join( ' ' );
					$( '#gglstpvrfctn-new-secret' ).text( code );
					$( '#gglstpvrfctn-code-test' ).val( '' ).trigger( 'focus' );
					$( '#gglstpvrfctn-secret-block' ).slideDown( '400' );
				}
			} );
			e.stopPropagation();
			return false;
		} );

		if ( $( '#gglstpvrfctn-not-verified' ).is( ':visible' ) ) {
			var secret = $( '#gglstpvrfctn-check-code' ).val();
			generateQr( secret );
		}

		$( '#gglstpvrfctn-cannot-scan' ).on( 'click', function( e ) {
			e.preventDefault();
			e.stopPropagation();
			$( '#gglstpvrfctn-secret-manual' ).slideDown();
		} );

		/* testing user code for new secret via AJAX on the profile page */
		$( '#gglstpvrfctn-check-code' ).on( 'click', function( e ) {
			e.preventDefault();
			var secret = $( this ).val();
			$.ajax( {
				type    : 'POST',
				url     : ajaxurl,
				data    : {
					action:						'gglstpvrfctn_test_secret',
					gglstpvrfctn_test_code:	$( '#gglstpvrfctn-code-test' ).val(),
					gglstpvrfctn_secret:	secret,
					gglstpvrfctn_nonce:		gglstpvrfctnScriptVars.ajax_nonce
				},
				success: function( data ) {
					if ( 'SUCCESS' == data ) {
						secret = secret.match(/.{1,4}/g);
						secret = secret.join( ' ' );
						$( '#gglstpvrfctn-cancel-new-secret' ).hide();
						$( '#gglstpvrfctn-get-new-secret' ).show();
						$( '#gglstpvrfctn-test-fail-message, #gglstpvrfctn-secret-block, #gglstpvrfctn-not-verified' ).slideUp();
						$( '#gglstpvrfctn-test-success-message, #gglstpvrfctn-verified' ).slideDown();
						$( '#gglstpvrfctn-test-success-message' ).delay(5000).slideUp();
					} else {
						$( '#gglstpvrfctn-code-test' ).val('').trigger( 'focus' );
						$( '#gglstpvrfctn-test-success-message' ).slideUp();
						$( '#gglstpvrfctn-test-fail-message' ).slideDown().delay( 3000 ).slideUp();
					}
				}
			} );
			e.stopPropagation();
			return false;
		} );

		$( '#gglstpvrfctn-cancel-new-secret' ).on( 'click', function( e ) {
			e.preventDefault();
			e.stopPropagation();
			$( this ).hide();
			$( '#gglstpvrfctn-get-new-secret' ).show();
			$( '#gglstpvrfctn-code-test' ).val('');
			$( '#gglstpvrfctn-test-fail-message, #gglstpvrfctn-test-success-message' ).hide();
			$( '#gglstpvrfctn-secret-block' ).slideUp();
			return false;
		} );

		$( '#gglstpvrfctn-generate-backup-codes' ).on( 'click', function( e ) {
			e.preventDefault();
			$.ajax( {
				type    : 'POST',
				url     : ajaxurl,
				data    : {
					action:						'gglstpvrfctn_get_new_backup_codes',
					gglstpvrfctn_nonce:		gglstpvrfctnScriptVars.ajax_nonce
				},
				success: function( data ) {
					if ( data ) {
						var toggleCodesButton = $( '#gglstpvrfctn-toggle-codes' );
						/* output new codes */
						$( '#gglstpvrfctn-backup-codes-list' ).html( data );
						/* refresh count of available codes */
						$( '.gglstpvrfctn-codes-count' ).removeClass( 'gglstpvrfctn-few-codes' ).html( '10' ).data( 'gglstpvrfctn-codes-count', 10 );
						/* show download codes button and notice */
						$( '#gglstpvrfctn-download-codes, .gglstpvrfctn-backup-notice' ).show();
						/* Switch button title to the corresponding one */
						toggleCodesButton.html( toggleCodesButton.data( 'hide-text' ) ).show();
						/* It's maaaagic! */
						$( '#gglstpvrfctn-backup-codes-wrapper' ).slideDown( '400' );
					} else {
						$( '#gglstpvrfctn-generate-backup-fail-message' ).show().fadeOut( 5000 );
					}
				}
			} );
			e.stopPropagation();
			return false;
		} );

		$( '#gglstpvrfctn-toggle-codes' ).on( 'click', function( e ) {
			e.preventDefault();
			var wrapper = $( '#gglstpvrfctn-backup-codes-wrapper' );
			if ( wrapper.is( ':visible' ) ) {
				$( this ).html( $( this ).data( 'show-text' ) );
			} else {
				$( this ).html( $( this ).data( 'hide-text' ) );
			}
			wrapper.slideToggle( '400' );
			e.stopPropagation();
		} );

		$( 'form' ).on( 'submit', function( e ) {
			if ( $( document.activeElement ).is( '#gglstpvrfctn-code-test' ) ) {
				e.preventDefault();
				$( '#gglstpvrfctn-check-code' ).click();
			}
		} );
	} );
} )( jQuery );