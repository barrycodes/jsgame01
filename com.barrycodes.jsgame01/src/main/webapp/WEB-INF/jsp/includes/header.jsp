<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<html>
<head>

    <%--FAVICON--%>

    <%--JQUERY--%>
    <c:url value="/webjars/jquery/2.1.3/jquery.min.js" var="jquery" />
    <script src="${jquery}"></script>

    <%--BOOTSTRAP--%>
    <c:url value="/webjars/bootstrap/3.3.4/js/bootstrap.min.js" var="bootstrapJS" />
    <script src="${bootstrapJS}"></script>
    <%--<c:url value="/webjars/bootstrap/3.3.4/css/bootstrap.min.css" var="bootstrapCSS" />--%>
    <%--<link href="${bootstrapCSS}" rel="stylesheet" media="screen" />--%>
    <%--BOOTSWATCH PAPER--%>
    <%--<c:url value="/static/css/bootswatch_paper.css" var="bootstrapCSS" />--%>
    <%--<link href="${bootstrapCSS}" rel="stylesheet" media="screen" />--%>
    <c:url value="/static/css/bootswatch_slate.css" var="bootstrapCSS" />
    <link href="${bootstrapCSS}" rel="stylesheet" media="screen" />

    <%--CUSTOM JS--%>
    <c:url value="/static/js/common.js" var="common" />
    <script src="${common}"></script>

    <%--CUSTOM CSS--%>
    <c:url value="/static/css/jsgame01.css" var="bootstrapCUSTOM" />
    <link href="${bootstrapCUSTOM}" rel="stylesheet" media="screen" />

    <%--<link href="http://vjs.zencdn.net/5.10.4/video-js.css" rel="stylesheet">--%>

    <%--<!-- If you'd like to support IE8 -->--%>
    <%--<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>--%>

    <%--<script src="http://vjs.zencdn.net/5.10.4/video.js"></script>--%>

    <title>Aston Technologies HR Application</title>

</head>
<body>
