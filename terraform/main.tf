resource "vercel_project" "repree" {
    auto_assign_custom_domains                        = true
    automatically_expose_system_environment_variables = true
    customer_success_code_visibility                  = false
    directory_listing                                 = false
    enable_affected_projects_deployments              = true
    framework                                         = "nextjs"
    function_failover                                 = false
    git_fork_protection                               = true
    git_lfs                                           = false
    git_repository                                    = {
        production_branch = "main"
        repo              = "mitate-gengaku/Repree"
        type              = "github"
    }
    name                                              = "repree"
    node_version                                      = "22.x"
    oidc_token_config                                 = {
        enabled     = false
        issuer_mode = "global"
    }
    prioritise_production_builds                      = true
    resource_config                                   = {
        fluid                     = false
        function_default_cpu_type = "standard_legacy"
    }
    root_directory                                    = "src"
    serverless_function_region                        = "iad1"
    team_id                                           = var.team_id
    vercel_authentication                             = {
        deployment_type = "standard_protection"
    }
}

resource "vercel_attack_challenge_mode" "repree" {
  project_id = vercel_project.repree.id
  enabled    = true
}

resource "vercel_firewall_config" "repree" {
    project_id = vercel_project.repree.id
    rules {
        rule {
            action          = {
                action     = "rate_limit"
                rate_limit = {
                    action = "rate_limit"
                    algo   = "fixed_window"
                    keys   = [
                        "ip",
                    ]
                    limit  = 100
                    window = 60
                }
            }
            condition_group = [
                {
                    conditions = [
                        {
                            op    = "eq"
                            type  = "path"
                            value = "/api"
                        },
                    ]
                },
            ]
            name            = "too_many_request"
        }
    }
}

resource "vercel_project_domain" "apex_domain" {
    project_id = vercel_project.repree.id
    domain               = "repree.net"
    redirect             = "www.repree.net"
    redirect_status_code = 308
}

resource "vercel_project_domain" "www_domain" {
    project_id = vercel_project.repree.id
    domain     = "www.repree.net"
}