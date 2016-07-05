package jsgame01.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.authentication.method}")
    private String authenticationMethod;

    @Value("${spring.security.ldap.domain}")
    private String ldapDomain;

    @Value("${spring.security.ldap.url}")
    private String ldapUrl;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        switch (authenticationMethod) {
            case "NONE": break;
            case "IN_MEMORY":
                auth.inMemoryAuthentication().withUser("user").password("123").roles("USER");
                auth.inMemoryAuthentication().withUser("admin").password("123").roles("ADMIN");
                auth.inMemoryAuthentication().withUser("dba").password("123").roles("DBA");
                break;
            case "LDAP":
                auth.authenticationProvider(activeDirectoryLdapAuthenticationProvider());
                break;
        }
    }

//    @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//
//        httpSecurity
//
//            // permit all with no authentication
//            .authorizeRequests()
//            .antMatchers("/").permitAll().and()
//            .authorizeRequests()
//            .antMatchers("/console/**").permitAll();
//
//        //region ADVANCED SETTINGS
//        httpSecurity.csrf().disable();
//        httpSecurity.headers().frameOptions().disable();
//        //endregion
//    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        switch (authenticationMethod) {
            case "NONE":
                httpSecurity
                        .authorizeRequests()
                        .antMatchers("/")
                        .permitAll()
                        .and()
                        .authorizeRequests()
                        .antMatchers("/console/**")
                        .permitAll();

                break;
            case "IN_MEMORY":
                httpSecurity

//            // permit all with no authentication
//            .authorizeRequests()
//            .antMatchers("/").permitAll().and()
//            .authorizeRequests()
//            .antMatchers("/console/**").permitAll();

                        // create authentication for ADMIN and anything with the URL=/admin/**

                        .authorizeRequests().antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
                        .and()
                        .authorizeRequests().antMatchers("/console/**").access("hasRole('ROLE_DBA')");
                //endregion

                //region LOGIN PAGE
                // login page
                httpSecurity
                        .formLogin()
                        .loginPage("/login")
                        .loginProcessingUrl("/login.do")
                        .defaultSuccessUrl("/")
                        .failureUrl("/login?err=1")
                        .usernameParameter("username")
                        .passwordParameter("password");

                //todo: add ant matcher and access for USER role
                break;
            case "LDAP":
                httpSecurity
                        .authorizeRequests().antMatchers("/static/**").permitAll()
                        .and()
                        .authorizeRequests().antMatchers("/login/**").permitAll()
                        .and()
                        .authorizeRequests().antMatchers("/").permitAll().anyRequest().authenticated()
                        .and()
                        .formLogin()
                        .and()
                        .logout()
                        .and()
                        .rememberMe();
                break;
        }
        //region ACCESS CONTROL
        //region ADVANCED SETTINGS
        httpSecurity.csrf().disable();
        httpSecurity.headers().frameOptions().disable();
        //endregion
    }

    @Bean
    public AuthenticationProvider activeDirectoryLdapAuthenticationProvider() {

        ActiveDirectoryLdapAuthenticationProvider authenticationProvider =
                new ActiveDirectoryLdapAuthenticationProvider(ldapDomain, ldapUrl);

        authenticationProvider.setConvertSubErrorCodesToExceptions(true);
        authenticationProvider.setUseAuthenticationRequestCredentials(true);

        return authenticationProvider;
    }
}
