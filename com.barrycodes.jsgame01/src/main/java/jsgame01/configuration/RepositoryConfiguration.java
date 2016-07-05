package jsgame01.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by barrsmit1 on 7/5/2016.
 */

@Configuration
@EnableAutoConfiguration
@EntityScan(basePackages = {"jsgame01.domain"})
@EnableJpaRepositories(basePackages = {"jsgame01.repositories"})
@EnableTransactionManagement
public class RepositoryConfiguration {
}
