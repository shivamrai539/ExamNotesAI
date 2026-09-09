import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
    const { result } = req.body;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=notes.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Importance: ${result.importance}`);
    doc.moveDown();

    // Sub Topics
    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);
    Object.entries(result.subTopics).forEach(([star, topics]) => {
        doc.moveDown(0.5);
        doc.fontSize(11).text(`${star} Topics: `);

        topics.forEach((t) => {
            doc.fontSize(12).text(`• ${t}`);
        });
    });

    doc.moveDown();

    // Notes
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);
    doc.fontSize(12).text(result.notes.replace(/[\*#]/g, ""));

    doc.moveDown();

    // Revision Points
    if (result.revisionPoints && result.revisionPoints.length > 0) {
        doc.fontSize(16).text("Revision Points");
        doc.moveDown(0.5);
        result.revisionPoints.forEach((pt) => {
            doc.fontSize(12).text(`• ${pt}`);
        });
        doc.moveDown();
    }

    // Important Questions
    if (result.questions) {
        doc.fontSize(16).text("Important Questions");
        doc.moveDown(0.5);

        if (result.questions.short) {
            doc.fontSize(13).text("Short Questions:");
            result.questions.short.forEach((q) => {
                doc.fontSize(11).text(`• ${q}`);
            });
            doc.moveDown(0.5);
        }

        if (result.questions.long) {
            doc.fontSize(13).text("Long Questions:");
            result.questions.long.forEach((q) => {
                doc.fontSize(11).text(`• ${q}`);
            });
        }
    }

    doc.end();
};