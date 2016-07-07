<ul class="nav navbar-nav navbar-right">
    <c:choose>
        <c:when test="${gameUser != null}">
            <li><a href>Hello ${gameUser.username}!</a></li>
            <%--LOGIN LINK--%>
            <li><a href="/logout">Logout</a></li>
        </c:when>
        <c:otherwise>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
        </c:otherwise>
    </c:choose>
</ul>