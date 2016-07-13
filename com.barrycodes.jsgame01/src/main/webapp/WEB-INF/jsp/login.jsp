<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<script>
    $(function() {
        alert("yep");
        if ("${gameUserVo.username}"==null) {
            alert("yep2");
            $("#inputUsername").val("");
        }
        if ("${gameUserVo.password}"==null) {
            alert("yep3");
            $("#inputPassword").val("");
        }
    });
</script>

<div class="wrapper container">
    <div id="main-wrapper" class="col-sm-12">
        <form:form modelAttribute="gameUserVo" cssClass="form-horizontal col-sm-5" action="/login" method="post">
            <form:hidden path="id"></form:hidden>
            <form:hidden path="version"></form:hidden>
            <legend>Login</legend>
            <div class="form-group">
                <label for="inputUsername" class="col-sm-4 control-label">Username</label>
                <div class="col-sm-8">
                    <form:input cssClass="form-control" path="username" id="inputUsername" type="text" placeholder="username" required="required"></form:input>
                </div>
                <span class="glyphicon glyphicon-ok usernameCheck usernameGood"></span>
                <span class="glyphicon glyphicon-remove usernameCheck usernameBad"></span>
            </div>
            <div class="form-group">
                <label for="inputPassword" class="col-sm-4 control-label">Password</label>
                <div class="col-sm-8">
                    <form:input cssClass="form-control" path="password" id="inputPassword" type="password" placeholder="password" required="required"></form:input>
                </div>
                <span class="glyphicon glyphicon-ok usernameCheck passwordGood"></span>
                <span class="glyphicon glyphicon-remove usernameCheck passwordBad"></span>
            </div>
            <div class="form-group">
                <div class="col-sm-8 col-sm-offset-4">
                    <form:button type="reset" value="cancel" class="btn btn-default">Cancel</form:button>
                    <form:button type="submit" value="save" class="btn btn-primary loginSubmit">Save</form:button>
                </div>
            </div>
        </form:form>
        <div class="col-sm-7">
            <p>Don't have an account? <a class="btn" href="/signup">Sign Up</a></p>
        </div>
    </div>
</div>

<%@include file="includes/footer.jsp" %>