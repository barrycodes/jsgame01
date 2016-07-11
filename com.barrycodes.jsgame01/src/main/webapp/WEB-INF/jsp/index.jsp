<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<c:url value="/static/js/game/settings.js" var="settingsJs" />
<c:url value="/static/js/game/slider.js" var="sliderJs" />
<c:url value="/static/js/game/ball.js" var="ballJs" />
<c:url value="/static/js/game/game.js" var="gameJs" />
<script src="${settingsJs}"></script>
<script src="${sliderJs}"></script>
<script src="${ballJs}"></script>
<script src="${gameJs}"></script>

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