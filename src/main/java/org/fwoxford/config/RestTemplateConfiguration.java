package org.fwoxford.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

/**
 * Created by gengluying on 2018/7/5.
 */
@Configuration
public class RestTemplateConfiguration {
    @Bean
    public RestOperations restTemplate() {
//        RestTemplate restTemplate = new RestTemplate();
        return new RestTemplate();
    }
}
