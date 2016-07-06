<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<c:url value="/static/js/jsgame01.js" var="jsgameJs" />
<script src="${jsgameJs}"></script>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <%--<center>--%>
                <div id="gamecontainer" class="jumbotron">
                    <div id="jsgame">

                    </div>
                </div>
                <%--<div class="jumbotron">--%>
                <%--<%@include file="game.jsp"%>--%>
                <%--${gameUser.username}--%>
                <%--</div>--%>
            <%--</center>--%>
        </div>
    </div>
</div>


<%--<%@include file="includes/footer.jsp" %>--%>