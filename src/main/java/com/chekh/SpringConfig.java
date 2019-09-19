package com.chekh;

import com.chekh.util.HibernateHelper;
import org.hibernate.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
@ComponentScan
public class SpringConfig {

    @Bean
    @Scope("prototype")
    Session getSession() {
        return HibernateHelper.getSessionFactory().openSession();
    }
}
