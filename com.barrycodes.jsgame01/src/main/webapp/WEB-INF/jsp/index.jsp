<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <c:url value="static/css/bootswatch_paper.css" var="bootswatchPaper"/>
    <c:url value="static/css/bootswatch_slate.css" var="bootswatchSlate"/>
    <c:url value="static/css/jsgame01.css" var="jsgameCss"/>
    <c:url value="static/js/bootstrap.min.js" var="bootstrapJs"/>
    <c:url value="static/js/jquery.min.js" var="jqueryJs"/>
    <c:url value="static/js/jsgame01.js" var="jsgameJs"/>
    <link href="${bootswatchSlate}" rel="stylesheet"/>
    <link href="${jsgameCss}" rel="stylesheet"/>
    <script src="${jqueryJs}"></script>
    <script src="${bootstrapJs}"></script>
    <script src="${jsgameJs}"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div class="jumbotron">
                <div id="jsgame">

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>

