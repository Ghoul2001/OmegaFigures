package com.omegafigures.springboot.model;

public class Usuario {

    private int id;
    private String perfil;
    private String nombre;
    private String cedula;
    private String correo;
    private String clave;

    public Usuario() {
    }

    public Usuario(int id, String perfil, String nombre, String cedula, String correo, String clave) {
        this.id = id;
        this.perfil = perfil;
        this.nombre = nombre;
        this.cedula = cedula;
        this.correo = correo;
        this.clave = clave;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
