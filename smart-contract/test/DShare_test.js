const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { MaxUint256 } = ethers;

describe("DShare Contract - Complete Test Suite", function () {
    let dshare;
    let owner, user1, user2, user3;

    const publicFile = {
        fileName: "public_document.pdf",
        author: "Alice",
        fileType: "application/pdf",
        fileSize: 2048,
        cid: "QmPublicDoc123",
        access: 1, // Public
        sharedWith: ethers.ZeroAddress
    };

    const privateFile = {
        fileName: "private_notes.txt",
        author: "Bob",
        fileType: "text/plain",
        fileSize: 512,
        cid: "QmPrivateNotes456",
        access: 0, // Private
        sharedWith: ethers.ZeroAddress
    };

    const sharedFile = {
        fileName: "shared_contract.docx",
        author: "Charlie",
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        fileSize: 4096,
        cid: "QmSharedDoc789",
        access: 2, // Shared
        sharedWith: "" // Will be set in tests
    };

    before(async () => {
        [owner, user1, user2, user3] = await ethers.getSigners();
        const DShareFactory = await ethers.getContractFactory("DShare");
        dshare = await DShareFactory.deploy();
        sharedFile.sharedWith = user2.address;
    });

    describe("Contract Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await dshare.owner()).to.equal(owner.address);
        });

        it("Should initialize with no blocked users", async () => {
            expect(await dshare.isBlocked(user1.address)).to.be.false;
            expect(await dshare.isBlocked(user2.address)).to.be.false;
        });
    });

    describe("File Upload Functionality", () => {
        it("Should allow uploading public files", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    publicFile.fileName,
                    publicFile.author,
                    publicFile.fileType,
                    publicFile.fileSize,
                    publicFile.cid,
                    publicFile.access,
                    publicFile.sharedWith
                )
            ).to.emit(dshare, "FileUploaded");
        });

        it("Should allow uploading private files", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    privateFile.fileName,
                    privateFile.author,
                    privateFile.fileType,
                    privateFile.fileSize,
                    privateFile.cid,
                    privateFile.access,
                    privateFile.sharedWith
                )
            ).to.emit(dshare, "FileUploaded");
        });

        it("Should allow uploading shared files", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    sharedFile.fileName,
                    sharedFile.author,
                    sharedFile.fileType,
                    sharedFile.fileSize,
                    sharedFile.cid,
                    sharedFile.access,
                    sharedFile.sharedWith
                )
            ).to.emit(dshare, "FileUploaded");
        });

        it("Should prevent duplicate CID uploads", async () => {
            await expect(
                dshare.connect(user2).uploadFile(
                    "duplicate.pdf",
                    "Eve",
                    "application/pdf",
                    1024,
                    publicFile.cid, // Reuse existing CID
                    1,
                    ethers.ZeroAddress
                )
            ).to.be.revertedWith("CID already exists");
        });

        it("Should prevent empty file names", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    "", // Empty file name
                    "Author",
                    "text/plain",
                    100,
                    "QmNewCID123",
                    1,
                    ethers.ZeroAddress
                )
            ).to.be.revertedWith("File name cannot be empty");
        });
    });

    describe("File Retrieval Functionality", () => {
        let publicFileHash, privateFileHash, sharedFileHash;

        before(async () => {
            // Generate hashes after upload
            publicFileHash = await dshare.generateFileHash(
                publicFile.fileName,
                publicFile.author,
                publicFile.fileType,
                publicFile.fileSize,
                publicFile.cid
            );

            privateFileHash = await dshare.generateFileHash(
                privateFile.fileName,
                privateFile.author,
                privateFile.fileType,
                privateFile.fileSize,
                privateFile.cid
            );

            sharedFileHash = await dshare.generateFileHash(
                sharedFile.fileName,
                sharedFile.author,
                sharedFile.fileType,
                sharedFile.fileSize,
                sharedFile.cid
            );
        });

        it("Should retrieve public file metadata (any user)", async () => {
            const [fileName, author] = await dshare.connect(user3).getFile(publicFileHash);
            expect(fileName).to.equal(publicFile.fileName);
            expect(author).to.equal(publicFile.author);
        });

        it("Should retrieve private file metadata (owner only)", async () => {
            const [fileName] = await dshare.connect(user1).getFile(privateFileHash);
            expect(fileName).to.equal(privateFile.fileName);

            await expect(dshare.connect(user2).getFile(privateFileHash))
                .to.be.revertedWith("You don't have access to this file");
        });

        it("Should retrieve shared file metadata (specific user)", async () => {
            const [fileName] = await dshare.connect(user2).getFile(sharedFileHash);
            expect(fileName).to.equal(sharedFile.fileName);

            const [fileName2] = await dshare.connect(user1).getFile(sharedFileHash);
            expect(fileName2).to.equal(sharedFile.fileName);

            await expect(dshare.connect(user3).getFile(sharedFileHash))
                .to.be.revertedWith("You don't have access to this file");
        });

        it("Should return correct file metadata structure", async () => {
            const metadata = await dshare.connect(user1).getFile(publicFileHash);
            expect(metadata).to.have.lengthOf(6); // 6 fields returned
            expect(metadata[0]).to.equal(publicFile.fileName); // fileName
            expect(metadata[3]).to.equal(publicFile.fileType); // fileType
            expect(metadata[5]).to.equal(publicFile.cid); // cid
        });
    });

    describe("User Blocking Functionality", () => {
        it("Should allow owner to block users", async () => {
            await expect(dshare.connect(owner).blockUser(user1.address))
                .to.emit(dshare, "UserBlocked")
                .withArgs(user1.address);
            expect(await dshare.isBlocked(user1.address)).to.be.true;
        });

        it("Should prevent blocked users from uploading files", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    "blocked.txt",
                    "BlockedUser",
                    "text/plain",
                    100,
                    "QmBlocked123",
                    1,
                    ethers.ZeroAddress
                )
            ).to.be.revertedWith("You are blocked from using this contract");
        });

        it("Should prevent blocked users from retrieving files", async () => {
            const fileHash = await dshare.generateFileHash(
                publicFile.fileName,
                publicFile.author,
                publicFile.fileType,
                publicFile.fileSize,
                publicFile.cid
            );

            await expect(dshare.connect(user1).getFile(fileHash))
                .to.be.revertedWith("You are blocked from using this contract");
        });

        it("Should allow owner to unblock users", async () => {
            await expect(dshare.connect(owner).unblockUser(user1.address))
                .to.emit(dshare, "UserUnblocked")
                .withArgs(user1.address);
            expect(await dshare.isBlocked(user1.address)).to.be.false;
        });

        it("Should prevent non-owners from blocking users", async () => {
            await expect(dshare.connect(user2).blockUser(user1.address))
                .to.be.revertedWith("Only owner allowed");
        });
    });

    describe("File Hash Generation", () => {
        it("Should generate deterministic file hashes", async () => {
            const hash1 = await dshare.generateFileHash(
                "test.txt",
                "Author",
                "text/plain",
                100,
                "QmTest123"
            );
            const hash2 = await dshare.generateFileHash(
                "test.txt",
                "Author",
                "text/plain",
                100,
                "QmTest123"
            );
            expect(hash1).to.equal(hash2);
        });

        it("Should generate different hashes for different files", async () => {
            const hash1 = await dshare.generateFileHash(
                "file1.txt",
                "Author",
                "text/plain",
                100,
                "QmTest123"
            );
            const hash2 = await dshare.generateFileHash(
                "file2.txt",
                "Author",
                "text/plain",
                100,
                "QmTest123"
            );
            expect(hash1).to.not.equal(hash2);
        });
    });

    describe("Edge Cases", () => {
        it("Should handle maximum file size", async () => {
          await expect(
            dshare.connect(user1).uploadFile(
              "huge_file.bin",
              "BigData",
              "application/octet-stream",
              ethers.MaxUint256,  // Changed this line
              "QmHugeFile123",
              1,
              ethers.ZeroAddress
            )
          ).to.emit(dshare, "FileUploaded");
        });

        it("Should prevent invalid access types", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    "invalid.txt",
                    "Author",
                    "text/plain",
                    100,
                    "QmInvalid123",
                    3, // Invalid access type
                    ethers.ZeroAddress
                )
            ).to.be.reverted; // Will fail due to out-of-bounds enum
        });

        it("Should handle special characters in metadata", async () => {
            await expect(
                dshare.connect(user1).uploadFile(
                    "特殊字符文件.txt",
                    "作者名",
                    "text/plain",
                    100,
                    "QmSpecialChars123",
                    1,
                    ethers.ZeroAddress
                )
            ).to.emit(dshare, "FileUploaded");
        });
    });
});