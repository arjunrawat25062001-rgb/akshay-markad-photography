package com.akshaymarkad.photography.repository;

import com.akshaymarkad.photography.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
