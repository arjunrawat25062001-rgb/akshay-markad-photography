package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial extends BaseEntity {
    private String author;
    @Column(length = 1000)
    private String message;
}
