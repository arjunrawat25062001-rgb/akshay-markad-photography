package com.akshaymarkad.photography;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "app.jwt.secret=ZmFrZV9zZWNyZXRfZm9yX3Rlc3RzX2hhdl9sb25nX2tleQ==",
        "app.jwt.expiration=60000",
        "app.jwt.refreshExpiration=86400000"
})
public class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void loginSuccess() throws Exception {
        String body = "{\"username\":\"admin\",\"password\":\"admin\"}";
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.refreshToken").exists());
    }

    @Test
    public void loginInvalidPassword() throws Exception {
        String body = "{\"username\":\"admin\",\"password\":\"wrong\"}";
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void bookingsRequiresAuth() throws Exception {
        mvc.perform(get("/api/bookings/test")).andExpect(status().isUnauthorized());
    }

    @Test
    public void adminRequiresAuthOrRole() throws Exception {
        mvc.perform(get("/api/admin/test")).andExpect(status().isUnauthorized());
    }
}
