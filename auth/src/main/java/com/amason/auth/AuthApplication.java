package com.amason.auth;

import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

	@Bean
    public CommandLineRunner createDefaultUser(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        return args -> {
            System.out.println("Checking if 'admin' user already exists...");
            if (!userRepository.existsByUsername("admin")) {
                System.out.println("'admin' user not found. Creating a new user...");

                int leftLimit = 97; // letter 'a'
                int rightLimit = 122; // letter 'z'
                int targetStringLength = 10;
                Random random = new Random();

                String generatedString = random.ints(leftLimit, rightLimit + 1)
                        .limit(targetStringLength)
                        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                        .toString();

                User user = User.builder()
                        .username("admin")
                        .email("teste@ipvc.pt")
                        .password(passwordEncoder.encode(generatedString))
                        .authorities("admin")
                        .build();
                userRepository.save(user);

                System.out.println("User 'admin' created successfully! Password: " + generatedString);
            } else {
                System.out.println("'admin' user already exists.");
            }
        };
    }

}
