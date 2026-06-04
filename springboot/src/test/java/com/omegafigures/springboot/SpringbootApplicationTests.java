package com.omegafigures.springboot;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SpringbootApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void gestionUsuariosRenderizaVistaThymeleaf() throws Exception {
        mockMvc.perform(get("/gestionUsuarios"))
            .andExpect(status().isOk())
            .andExpect(view().name("gestionUsuarios"))
            .andExpect(content().string(containsString("Usuarios")))
            .andExpect(content().string(containsString("Luis Teran")))
            .andExpect(content().string(containsString("1714032587")))
            .andExpect(content().string(containsString("lteran@gmail.com")));
    }

    @Test
    void informacionRenderizaDatosDelServidor() throws Exception {
        mockMvc.perform(get("/informacion"))
            .andExpect(status().isOk())
            .andExpect(view().name("informacion"))
            .andExpect(content().string(containsString("Datos del Servidor")))
            .andExpect(content().string(containsString("APP Manejo Usuarios")))
            .andExpect(content().string(containsString("localhost")));
    }

    @Test
    void usuariosRetornaJson() throws Exception {
        mockMvc.perform(get("/api/v1/usuarios"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.Usuario.id").value(1))
            .andExpect(jsonPath("$.Usuario.perfil").value("civil"))
            .andExpect(jsonPath("$.Usuario.nombre").value("Luis Teran"))
            .andExpect(jsonPath("$.Usuario.cedula").value("1714032587"))
            .andExpect(jsonPath("$.Usuario.correo").value("lteran@gmail.com"))
            .andExpect(jsonPath("$.Usuario.clave").value("lteran"));
    }

    @Test
    void saludoRetornaJson() throws Exception {
        mockMvc.perform(get("/api/saludo"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.mensaje").value("Hola desde Spring Boot!"));
    }
}
