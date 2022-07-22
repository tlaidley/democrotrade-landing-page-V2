$(document).ready(function () {
    $("#waitListForm").on("submit", function (event) {
        event.preventDefault();
        let waitListName = $("#waitListName").val();
        let waitListEmail = $("#waitListEmail").val();
        $.ajax({
            url: "/subscribers",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ waitListName: waitListName, waitListEmail: waitListEmail }),
            success: function (res) {
                $("#JoinFormHeader").html(`Welcome to the Waiting List: ${res.message}`);
                $('#waitListForm').trigger("reset");
                $("#JoinForm").hide();
                $("#JoinResults").show();
                console.log('success');
            }
        })
    })
    $('#ModalSubscription').on('hidden.bs.modal', function () {
        $("#JoinResults").hide();
        $("#JoinFormHeader").html(`Join Waitlist`);
        $("#JoinForm").show();
    })
})