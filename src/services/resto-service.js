export default class RestoService {
    _apiBase = 'http://localhost:3004';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}`+
            `, received ${res.status}`);
        }
        return await res.json();
    }
    async getMenuItems () {
        return await this.getResource(`/menu/`);
    }

    async getItem(id) {
        const item = await fetch("http://localhost:3004/menu/" + id)
        .then((data) =>
          data.json()
        );
        return item;
      }


    async setCart(itemsToPost) {
        const count = await this.getOrderNumber();
        const newOrder = {
          id: count,
          order: itemsToPost,
        };
        await fetch("http://localhost:3004/cartPost", {
          method: "POST",
          body: JSON.stringify(newOrder),
          headers: { "Content-Type": "application/json;charset=utf-8" },
        })
            .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
        });
      }
      async getOrderNumber() {
        const res = await fetch("http://localhost:3004/cartPost")
            .then((res) => res.json());

        console.log(res.length);
        
        const orderNumber = res.length + 1;
    
        return orderNumber;
      }
}