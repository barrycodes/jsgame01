<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<c:url value="/static/js/jsgame01.js" var="jsgameJs" />
<script src="${jsgameJs}"></script>

<div class="container">
    <div class="jumbotron" id="jsgame">
        <%@include file="game.jsp"%>
        ${gameUser.username}
    </div>
</div>


<%@include file="includes/footer.jsp" %>