	package com.example.api_gateway;

	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	// import org.springframework.cloud.gateway.route.RouteLocator;
	// import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
	// import org.springframework.context.annotation.Bean;
	import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

	@SpringBootApplication
	@EnableDiscoveryClient
	public class ApiGatewayApplication {

		public static void main(String[] args) {
			SpringApplication.run(ApiGatewayApplication.class, args);
		}

		// @Bean
		// public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		// 	return builder.routes()
		// 			.route("auth-service", r -> r.path("api/auth/**")
		// 					.uri("http://localhost:8081"))
		// 			.route("user-service", r -> r.path("api/user/**")
		// 					.uri("http://localhost:8081"))
		// 			.route("task-service", r -> r.path("api/tasks/**")
		// 					.uri("http://localhost:8082"))
		// 			.build();
		// }
	}
