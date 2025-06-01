terraform {
  required_providers {
    vercel = {
        source = "vercel/vercel"
        version = "~> 2.0"
    }
  }
}

provider "vercel" {
  api_token = var.api_token
  team = var.team_id
}