package com.futpao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.futpao")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("🚀 FUTPÃO Backend rodando em http://localhost:8080");
        System.out.println("📱 Celulares na mesma rede acessem: http://SEU_IP:8080/api/dados");
    }
}
