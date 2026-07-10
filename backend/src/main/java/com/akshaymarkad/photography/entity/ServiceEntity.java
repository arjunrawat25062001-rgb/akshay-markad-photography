package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEntity extends BaseEntity {
    private String name;
    private String description;
    private Double price;
}
