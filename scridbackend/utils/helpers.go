package utils

func IsEmail(s string) bool {
	return len(s) > 3 && (s[len(s)-4:] == ".com" || s[len(s)-4:] == ".org" || s[len(s)-4:] == ".net")
}
