module.exports = {
    async up(db, client) {
        const pupils = await db.collection('Pupils').find();

        try {
            await db.createCollection('Payments');

            for (const pupil of await pupils.toArray()) {
                for (const payment of pupil.paymentHistory) {
                    await db.collection('Payments').insertOne({
                        owner_id: pupil._id,
                        ...payment
                    });
                }

                await db
                    .collection('Pupils')
                    .updateOne(
                        { _id: pupil._id },
                        { $unset: { paymentHistory: '' } }
                    );
            }
        } catch (e) {}
    },

    async down(db, client) {}
};
