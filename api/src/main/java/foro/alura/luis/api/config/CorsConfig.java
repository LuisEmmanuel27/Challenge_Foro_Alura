// package foro.alura.luis.api.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

// @Bean
// public CorsFilter corsFilter() {
// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// CorsConfiguration config = new CorsConfiguration();

// // Permite solicitudes desde tu aplicación React en http://localhost:5173
// config.addAllowedOrigin("http://localhost:5173");

// // Configura otros permisos de CORS según sea necesario
// config.addAllowedMethod("GET");
// config.addAllowedMethod("POST");
// config.addAllowedMethod("PUT");
// config.addAllowedMethod("DELETE");
// config.addAllowedMethod("OPTIONS");
// config.addAllowedMethod("HEAD");
// config.addAllowedHeader("*");

// source.registerCorsConfiguration("/**", config);
// return new CorsFilter(source);
// }
// }
