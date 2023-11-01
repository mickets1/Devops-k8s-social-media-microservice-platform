######################################################################
# Variables

variable "external_network_name" {
  description = "The name of the external network to be used"
  type        = string
  default     = "public"
}

variable "flavor_name" {
  description = "The name of the flavor to be used"
  type        = string
  default     = "c2-r2-d20"
}

variable "image_name" {
  description = "The name of the image to be used"
  type        = string
  default     = "Ubuntu server 20.04"
}

variable "keypair" {
  description = "The name of the keypair to be used"
  type    = string
  default = "ma225gn_Keypair" 
}

variable "network_name" {
  description = "The name of the network to create"
  type    = string
  default = "staging-nodenet"
}

variable "port_name" {
  description = "The name of the port to create"
  type    = string
  default = "staging-nodenet-port"
}

variable "router_name" {
  description = "The name of the router to create"
  type    = string
  default = "staging-nodenet-router"
}

variable "security_groups" {
  description = "Map of security groups"
  type = map(any)
  # type = map(object({
  #   description = string
  #   from_port   = number
  #   to_port     = number
  #   ip_protocol = string
  #   cidr        = string
  # }))

  default = {
    default = {},
    stagingssh = {
      description = "STAGING-SSH"
      from_port   = 22
      to_port     = 22
      ip_protocol = "tcp"
      cidr        = "0.0.0.0/0"
    },
    staginghttp = {
      description = "STAGING-HTTP"
      from_port   = 80
      to_port     = 80
      ip_protocol = "tcp"
      cidr        = "0.0.0.0/0"
    },
    staginghttps = {
      description = "STAGING-HTTPS"
      from_port   = 443
      to_port     = 443
      ip_protocol = "tcp"
      cidr        = "0.0.0.0/0"
    }
  }
}

variable "control_plane_node_machine_name" {
  description = "The name of the server to create"
  type    = string
  default = "staging-control-plane"
}

variable "worker_node_machine_name" {
  description = "The prefix name of the worker node machine to create"
  type    = string
  default = "staging-node"
}


variable "subnet_name" {
  description = "The name of the subnet to create"
  type    = string
  default = "	staging-nodenetsubnet"
}
