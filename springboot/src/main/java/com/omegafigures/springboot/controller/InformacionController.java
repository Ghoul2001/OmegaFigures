package com.omegafigures.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InformacionController {

    @GetMapping("/informacion")
    public String informacion(Model model) {
        model.addAttribute("titulo", "Datos del Servidor");
        model.addAttribute("app", "APP Manejo Usuarios");
        model.addAttribute("ip", "localhost");
        return "informacion";
    }
}
