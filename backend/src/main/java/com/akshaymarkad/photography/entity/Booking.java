package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity {
    private String customerName;
    private String customerEmail;
    private LocalDateTime bookingDate;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceEntity service;
}
