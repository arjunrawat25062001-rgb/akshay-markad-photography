package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage extends BaseEntity {
    private String name;
    private String email;
    @Column(length = 2000)
    private String message;
    private LocalDateTime receivedAt;
}
