variable "api_token" {
  description = "Vercelのアクセストークン"
  type = string
  sensitive = true
}

variable "team_id" {
  description = "VercelのTeam ID"
  type = string
  sensitive = true
}