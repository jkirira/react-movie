import React from "react";
import SubscribeForm from "./SubscribeForm";

export default function Footer() {
    return (
        <div className="footer">
            <section className="footer-main">

                <div className="footer-main-text">
                    <h2>Footer</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati illo magnam expedita mollitia voluptatem dolore necessitatibus maiores quibusdam nulla, sint, quia non molestiae dolorem quis, facere vero aspernatur repellat repellendus.
                        Dignissimos rerum, nobis ipsa pariatur voluptatum repudiandae labore accusamus. Dolorum odio aliquam rerum iste natus corrupti excepturi mollitia velit cumque, vero voluptatum facere sed repellendus aspernatur earum ratione esse quia.
                    </p>
                </div>

                <div className="subscribe-form-wrapper">
                    <SubscribeForm />
                </div>

            </section>

            <section className="footer-end">
                <p>&copy; Copyright { new Date().getFullYear() }</p>
            </section>

        </div>
    )
}
