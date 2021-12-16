/*
 * Collection: Pupil
 * Description:
 *      1) `phone` and `parentPhone` will change their name to `phones` and `parentPhones`
 *      2) their type will be changed to array of string
 * */

module.exports = {
    async up(db, client) {
        const pupils = await db.collection('Pupils').find();

        for (const pupil of await pupils.toArray()) {
            await db
                .collection('Pupils')
                .updateOne(
                    { _id: pupil._id },
                    { $set: { phones: [pupil.phone] } }
                );

            await db
                .collection('Pupils')
                .updateOne(
                    { _id: pupil._id },
                    { $set: { parentPhones: [pupil.parentPhone] } }
                );

            await db
                .collection('Pupils')
                .updateOne({ _id: pupil._id }, { $unset: { phone: '' } });

            await db
                .collection('Pupils')
                .updateOne({ _id: pupil._id }, { $unset: { parentPhone: '' } });
        }
    },
    async down(db, client) {
        const pupils = await db.collection('Pupils').find();

        for (const pupil of await pupils.toArray()) {
            await db
                .collection('Pupils')
                .updateOne({ _id: pupil._id }, { $unset: { phones: '' } });

            await db
                .collection('Pupils')
                .updateOne(
                    { _id: pupil._id },
                    { $unset: { parentPhones: '' } }
                );

            await db
                .collection('Pupils')
                .updateOne(
                    { _id: pupil._id },
                    { $set: { phone: pupil.phones[0] } }
                );

            await db
                .collection('Pupils')
                .updateOne(
                    { _id: pupil._id },
                    { $set: { parentPhone: pupil.parentPhones[0] } }
                );
        }
    }
};
