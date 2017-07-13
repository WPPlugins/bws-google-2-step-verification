( function( $ ) {
	$( document ).ready( function() {

		/* Plugin Settings Page */

		/* mark/unmark every single role on check/uncheck "All" option in user roles list */
		$( '#gglstpvrfctn-all-roles' ).on( 'change', function() {
			var roles = $( '.gglstpvrfctn-role' );
			if ( $( this ).is( ':checked' ) ) {
				roles.prop( 'checked', true );
			} else {
				roles.prop( 'checked', false );
			}
		} );

		/* check if "All" option should be marked on check/uncheck single user role in user role list */
		$( '.gglstpvrfctn-role' ).on( 'change', function() {
			var roles = $( '.gglstpvrfctn-role' ),
				checked_roles = roles.filter(':checked');
			if ( roles.length == checked_roles.length ) {
				$( '#gglstpvrfctn-all-roles' ).prop( 'checked', true );
			} else {
				$( '#gglstpvrfctn-all-roles' ).prop( 'checked', false );
			}
		} );

		/* Hide notice and unset option using AJAX */
		$( document ).on( 'click', '.gglstpvrfctn-banner .notice-dismiss', function( e ) {
			e.preventDefault();
			var form = $( this ).closest( '.gglstpvrfctn-banner' ).find( 'form' ),
				ajax_nonce = form.find( '#gglstpvrfctn_settings_nonce' ).val();
			$.ajax( {
				type    : 'POST',
				url     : ajaxurl,
				data    : {
					action						: 'gglstpvrfctn_hide_settings_notice',
					gglstpvrfctn_hide_banner	: form.find( '#gglstpvrfctn_hide_banner' ).val(),
					gglstpvrfctn_settings_nonce	: ajax_nonce
				},
				success: function( data ) {
					if ( '1' == data ) {
						form.closest('.gglstpvrfctn-banner').hide();
					}
				}
			} );
		} );
	} );
} )( jQuery );
