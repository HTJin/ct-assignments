const token = `c17a1279a3e43abd7241e9fef0f9799af3f9f4649c0f0e2b`;
const fireToken = localStorage.getItem("user_token");

export const serverCalls = {
    get: async () => {
        const response = await fetch(
            `https://drone-inventory.glitch.me/api/drones/${fireToken}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch data from server");
        }
        return await response.json();
    },
    create: async (data: any = {}) => {
        const response = await fetch(
            `https://drone-inventory.glitch.me/api/drones/${fireToken}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to create new data on server");
        }
        return await response.json();
    },
    update: async (id: string, data: any = {}) => {
        const response = await fetch(
            `https://drone-inventory.glitch.me/api/drones/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to update data on server");
        }
        console.log(`Successfully updated drone with id ${id}`);
    },
    delete: async (id: string) => {
        const response = await fetch(
            `https://drone-inventory.glitch.me/api/drones/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to delete drone with id ${id}`);
        }
    },
};
