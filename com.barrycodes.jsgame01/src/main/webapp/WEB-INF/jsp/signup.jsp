<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<script>
    var passGood = false;
    var userGood = false;
    $(function() {
        $(".loginSubmit").prop('disabled', true);
        setUsernameCheck();
        setPasswordCheck();
    });
    function setPasswordCheck() {
        $("#inputPassword").change(function() {
            var pass = $(this).val();
            var good = false;
            if (pass.length >= 5)
                good = true;
            setPasswordGood(good);
        });
    }
    function setUsernameCheck() {
        $("#inputUsername").change(function() {
            var uName = $(this).val();
            var goodName = false;
//            console.log(uName);
            if (uName.length >= 3) {
                $.getJSON("/checkusername?username=" + uName, function(data){
                    if (data) {
                        goodName = true;
                    }
                    setUsernameGood(goodName);
                });
            }
            else {
                setUsernameGood(goodName);
            }
        });
    }
    function setUsernameGood(good) {
        $(".usernameGood").css("display", good ? "inline-block" : "none");
        $(".usernameBad").css("display", !good ? "inline-block" : "none");
        userGood = good;
        updateSubmitBtn();
    }
    function setPasswordGood(good) {
        $(".passwordGood").css("display", good ? "inline-block" : "none");
        $(".passwordBad").css("display", !good ? "inline-block" : "none");
        passGood = good;
        updateSubmitBtn();
    }
    function updateSubmitBtn() {
        $(".loginSubmit").prop('disabled', !userGood || !passGood);
    }
</script>

<div class="wrapper container">
    <div id="main-wrapper" class="col-sm-12">
        <form:form modelAttribute="gameUserVo" cssClass="form-horizontal" action="/signup" method="post">
            <form:hidden path="id"></form:hidden>
            <form:hidden path="version"></form:hidden>
            <legend>Sign Up</legend>
            <div class="form-group">
                <label for="inputUsername" class="col-sm-2 control-label">Username</label>
                <div class="col-sm-3">
                    <form:input cssClass="form-control" path="username" id="inputUsername" type="text" placeholder="username" required="required"></form:input>
                </div>
                <span class="glyphicon glyphicon-ok usernameCheck usernameGood"></span>
                <span class="glyphicon glyphicon-remove usernameCheck usernameBad"></span>
            </div>
            <div class="form-group">
                <label for="inputPassword" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-3">
                    <form:input cssClass="form-control" path="password" id="inputPassword" type="password" placeholder="password" required="required"></form:input>
                </div>
                <span class="glyphicon glyphicon-ok usernameCheck passwordGood"></span>
                <span class="glyphicon glyphicon-remove usernameCheck passwordBad"></span>
            </div>
            <div class="form-group">
                <div class="col-sm-4 col-sm-offset-2">
                    <form:button type="reset" value="cancel" class="btn btn-default">Cancel</form:button>
                    <form:button type="submit" value="save" class="btn btn-primary loginSubmit" ng-enabled="">Save</form:button>
                </div>
            </div>
        </form:form>
    </div>
</div>

<%@include file="includes/footer.jsp" %>