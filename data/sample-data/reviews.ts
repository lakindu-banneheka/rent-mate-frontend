import { Review } from "@/types/reviewTypes";

export const sampleReviews: Review[] = [
    {
      id: "review1",
      reviewerId: "user001",
      itemId: "item123",
      comment: "Great quality item! Very satisfied with the service.",
      rating: 9,
      createdAt: new Date("2024-01-01T12:00:00Z"),
      updatedAt: new Date("2024-01-02T09:00:00Z"),
    },
    {
      id: "review2",
      reviewerId: "user002",
      itemId: "item456",
      comment: "Decent experience, but delivery was delayed.",
      rating: 7,
      createdAt: new Date("2024-01-03T10:00:00Z"),
      updatedAt: new Date("2024-01-03T15:00:00Z"),
    },
    {
      id: "review3",
      reviewerId: "user003",
      itemId: "item789",
      comment: "The item was not as described. Disappointed.",
      rating: 4,
      createdAt: new Date("2024-01-05T14:00:00Z"),
      updatedAt: new Date("2024-01-05T18:00:00Z"),
    },
    {
      id: "review4",
      reviewerId: "user004",
      itemId: "item321",
      comment: "Amazing experience! Highly recommend this service.",
      rating: 10,
      createdAt: new Date("2024-01-07T11:00:00Z"),
      updatedAt: new Date("2024-01-07T12:30:00Z"),
    },
    {
      id: "review5",
      reviewerId: "user005",
      itemId: "item654",
      comment: "Good product, but the price was a bit high.",
      rating: 8,
      createdAt: new Date("2024-01-08T16:00:00Z"),
      updatedAt: new Date("2024-01-08T18:00:00Z"),
    },
  ];
  