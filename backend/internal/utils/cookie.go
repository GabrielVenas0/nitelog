package utils

import (
	"net/http"
)

func GenerateAuthCookie(token string) *http.Cookie {
	cookie := http.Cookie {
		Name: "session_token",
		Value: token,
		Path: "/",
		MaxAge: 24 * 3600,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}
	return (&cookie)
}

func GenerateLogoutCookie() *http.Cookie {
	cookie := http.Cookie {
		Name: "session_token",
		Path: "/",
		MaxAge: -1,
		HttpOnly: true,
	}
	return (&cookie)
}