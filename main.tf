terraform {
  required_providers {
    petstore = {
      source  = "hashicorp.com/edu/petstore"
     // version = ">= 1.2.0, < 2.0.0"
    }
  }
}

provider "petstore" {}
