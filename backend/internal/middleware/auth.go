package middleware

import (
	. "backend/env"
	"context"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie("session_token")
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		tokenString := cookie.Value
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Método de assinatura inesperado: %v", token.Header["alg"])
			}
			return []byte(ENV.GetKey("JWT_SECRET")), nil
		})
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID := claims["user_id"].(string)
			ctx := context.WithValue(r.Context(), "userID", userID)

			next.ServeHTTP(w, r.WithContext(ctx))
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}
}
