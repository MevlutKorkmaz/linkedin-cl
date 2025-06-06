package com.linkedin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        String uploadPath = System.getProperty("user.dir") + "/uploads/";
//
//        registry.addResourceHandler("/images/**")
//                .addResourceLocations("file:" + uploadPath);
//    }
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/images/**")
            .addResourceLocations("file:/C:/Users/MK/Desktop/se/images/");
}

}
