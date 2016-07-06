<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<div class="wrapper container">
    <div id="main-wrapper" class="col-sm-12">
        <form:form modelAttribute="gameUserVo" cssClass="form-horizontal" action="/login" method="post">
            <form:hidden path="id"></form:hidden>
            <form:hidden path="version"></form:hidden>
            <legend>Login or Sign Up</legend>
            <div class="form-group">
                <label for="inputUsername" class="col-sm-2 control-label">Username</label>
                <div class="col-sm-3">
                    <form:input cssClass="form-control" path="username" id="inputUsername" type="text" placeholder="username"></form:input>
                </div><span class="glyphicon glyphicon-ok"></span>
            </div>
            <div class="form-group">
                <label for="inputPassword" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-3">
                    <form:input cssClass="form-control" path="password" id="inputPassword" type="password" placeholder="password"></form:input>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-4 col-sm-offset-2">
                    <form:button type="reset" value="cancel" class="btn btn-default">Cancel</form:button>
                    <form:button type="submit" value="save" class="btn btn-primary">Save</form:button>
                </div>
            </div>
        </form:form>
    </div>
</div>

<%@include file="includes/footer.jsp" %>