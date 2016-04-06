/* jshint -W100 */

var site = site || {};
site.baseUrl = site.baseUrl || "";
$(document).ready(function (e) {
    // locate each partial section.
    // if it has a URL set, load the contents into the area.	
    $(".partialContents").each(function (index, item) {
        var url = site.baseUrl + $(item).data("url");
        if (url && url.length > 0) {
            $(item).load(url);
        }
    });
    // DEMO ONLY - JUST IGNORE
    // Just to make the loading time obvious....
    $("a.nav").click(function () {
        $("body").html("");
    });
});
var newCustomer = (function () {
    var showCancelPanel = function () {
        $('#RejectionReason').get(0).selectedIndex = 0;
        if ($('#btnShowCancelPanel').val() !== 'hide') {
            $('#pnlCancelCustomer').show();
            $('#btnShowCancelPanel').hide();
        }
    };
    return {
        ShowCancelPanel: function () {
            showCancelPanel();
        }
    };
} ());

$(document).ready(function () {
    $('#pnlCancelCustomer').hide(); //To hide the fieldset on load

    //On click of show panel button
    $('#btnShowCancelPanel').click(function () {
        newCustomer.ShowCancelPanel();
        return false;
    });
});