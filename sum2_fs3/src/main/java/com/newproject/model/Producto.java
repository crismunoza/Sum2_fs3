package com.newproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre del producto es obligatorio")
    @Size(min = 1, max = 100, message = "El nombre del producto debe tener entre 1 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @NotNull(message = "La descripción del producto es obligatoria")
    @Size(min = 1, max = 255, message = "La descripción del producto debe tener entre 1 y 255 caracteres")
    @Column(nullable = false)
    private String descripcion;

    @NotNull(message = "El precio del producto es obligatorio")
    @Min(value = 0, message = "El precio del producto no puede ser negativo")
    @Column(nullable = false)
    private Double precio;

    @NotNull(message = "El stock del producto es obligatorio")
    @Min(value = 0, message = "El stock del producto no puede ser negativo")
    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = true)
    private String url; // Nueva columna para la URL

    @Column(nullable = false)
    private Integer nuevo = 0; // Nueva columna para indicar si es un producto nuevo (0 = no, 1 = sí)

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getNuevo() {
        return nuevo;
    }

    public void setNuevo(Integer nuevo) {
        this.nuevo = nuevo;
    }
}
