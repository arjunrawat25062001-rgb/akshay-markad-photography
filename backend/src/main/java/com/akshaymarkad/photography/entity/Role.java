package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String name;
}
