( function( $ ) {
	$( document ).ready( function() {
		$( '.gglstpvrfctn-login-wrap, .gglstpvrfctn-request-email' ).hide();

		var form = $( '.gglstpvrfctn-login-wrap' ).closest( 'form' );

		function getUserInfo( user_login ) {
			var result = false;

			$.ajax( {
				type	: 'POST',
				url		: gglstpvrfctnLoginVars.ajaxurl,
				data	: {
					action						: 'gglstpvrfctn_check_verification_options',
					gglstpvrfctn_login			: user_login,
					gglstpvrfctn_ajax_nonce		: gglstpvrfctnLoginVars.ajax_nonce
				},
				success: function( data ) {
					var user = {
						'enabled' : 0,
					};
					try {
						user = JSON.parse( data );
					} catch ( err ) {
						console.log( 'getUserInfo REQUEST: Server response is invalid' );
					}
					if ( 1 == user.enabled ) {
						$( '#login_error, .message' ).hide();
						if ( -1 != $.inArray( 'email', user.methods ) ) {
							$( '.gglstpvrfctn-request-email' ).show();
						}
						$( '.gglstpvrfctn-login-wrap' ).show();
						$( '#gglstpvrfctn-code' ).trigger( 'focus' );
					} else {
						form.removeClass( 'processing' ).trigger( 'submit' );
					}
				}
			} );
		}

		if ( typeof form != 'undefined' ) {

			var login_field = form.find( '#login, #userlogin, #user_login, #username, #user_name' + gglstpvrfctnLoginVars.custom_login_fields ),
				user_login;

			form.one( 'submit', function( e ) {
				$( this ).addClass( 'processing' );
				e.preventDefault();

				if ( typeof login_field != 'undefined' ) {
					user_login = login_field.val();
				} else {
					user_login = '';
				}

				getUserInfo( user_login );
			} );

			/* Sending email code request via AJAX and printing message if code is sent */
			$( '.gglstpvrfctn-request-email' ).on( 'click', function( e ) {
				e.preventDefault();
				if ( typeof login_field != 'undefined' ) {
					user_login = login_field.val();
				} else {
					user_login = '';
				}
				$.ajax( {
					type    : 'POST',
					url     : gglstpvrfctnLoginVars.ajaxurl,
					data    : {
						action:						'gglstpvrfctn_request_email_code',
						gglstpvrfctn_login:			user_login,
						gglstpvrfctn_ajax_nonce:	gglstpvrfctnLoginVars.ajax_nonce
					},
					success: function( data ) {
						try {
							data = JSON.parse( data );
							if ( 1 == data['result'] ) {
								if ( $( 'p.gglstpvrfctn-message' ).length ) {
									$( 'p.gglstpvrfctn-message' ).html( data['message'] );
								} else {
									form.before( '<p class="message gglstpvrfctn-message">' + data['message'] + '</p>' );
								}
							}
						} catch ( err ) {
							/* server response is invalid. */
							console.log( 'EMAIL REQUEST: Server response is invalid' );
						}
					}
				} );
			} );
		}
	} );
} )( jQuery );