<%@include file="includes/header.jsp" %>
<%@include file="includes/navbar.jsp" %>

<c:url value="/static/js/game/settings.js" var="settingsJs" />
<c:url value="/static/js/game/blocks.js" var="blocksJs" />
<c:url value="/static/js/game/slider.js" var="sliderJs" />
<c:url value="/static/js/game/ball.js" var="ballJs" />
<c:url value="/static/js/game/game.js" var="gameJs" />
<script src="${settingsJs}"></script>
<script src="${blocksJs}"></script>
<script src="${sliderJs}"></script>
<script src="${ballJs}"></script>
<script src="${gameJs}"></script>

<%--<scrip--%>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <%--<center>--%>
                <div id="gamecontainer" class="jumbotron">
                    <div id="begin" class="btn btn-primary">Begin</div>
                    <span id="lives">Lives: <span id="livesCount">3</span></span>
                    <span id="score">Score: <span id="scoreCount">0</span></span>
                    <div id="jsgame">
                        <div id='ready'>
                            READY
                        </div>
                        <div id='go'>
                            GO!
                        </div>
                        <div id='slider'></div>
                        <div id='ball'></div>
                    </div>
                </div>
                <%--<div class="jumbotron">--%>
                <%--<%@include file="game.jsp"%>--%>
                <%--${gameUser.username}--%>
                <%--</div>--%>
            <%--</center>--%>
        </div>
    </div>
    <div class="row highscores">
        <div class="col-md-6 highscores1">
            <h3>Hall of Fame</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <c:set var="idx" value="1" scope="page" />
                    <c:forEach var="game" items="${top10Games}">
                        <tr>
                            <td>${idx}</td>
                            <td><fmt:formatDate value="${game.date}" pattern="yyyy-MM-dd" /></td>
                            <td>${game.score}</td>
                            <td>${game.user.username}</td>
                        </tr>
                        <c:set var="idx" value="${idx+1}" scope="page" />
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <div class="col-md-6 highscores2">
            <h3>Today's High Scores</h3>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Score</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    <c:set var="idx" value="1" scope="page" />
                    <c:forEach var="game" items="${top10GamesToday}">
                        <tr>
                            <td>${idx}</td>
                            <td>${game.score}</td>
                            <td>${game.user.username}</td>
                        </tr>
                        <c:set var="idx" value="${idx+1}" scope="page" />
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</div>
<%@include file="includes/footer.jsp" %>